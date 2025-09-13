import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { logActivity, createActivityDescription } from '@/lib/activityLogger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// PATCH /api/users/[id]/password - Update user password
export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { password } = await request.json();

    if (!password) {
      return Response.json({ error: 'Password is required' }, { status: 400 });
    }

    if (password.length < 6) {
      return Response.json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
    }

    await connectToDatabase();

    // Get user before update
    const user = await User.findById(params.id);
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);

    const updatedUser = await User.findByIdAndUpdate(
      params.id,
      {
        password: hashedPassword,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    ).select('-password');

    // Log activity
    await logActivity({
      type: 'user',
      action: 'password_changed',
      entityType: 'user',
      entityId: user._id,
      entityName: user.name,
      description: createActivityDescription('user', 'password_changed', user.name),
      user: session.user,
      request
    });

    return Response.json({
      message: 'Password updated successfully',
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isSystemAdmin: updatedUser.isSystemAdmin,
        updatedAt: updatedUser.updatedAt
      }
    });
  } catch (error) {
    console.error('Error updating password:', error);
    return Response.json({ error: 'Failed to update password' }, { status: 500 });
  }
}
