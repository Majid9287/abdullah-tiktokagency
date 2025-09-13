import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { logActivity, createActivityDescription } from '@/lib/activityLogger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET /api/users/[id] - Get single user
export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const user = await User.findById(id).select('-password');

    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    return Response.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return Response.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

// PUT /api/users/[id] - Update user
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    await connectToDatabase();
    const { id } = await params;

    // Get original user for comparison
    const originalUser = await User.findById(id).select('-password');
    if (!originalUser) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    // If password is being updated, hash it
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    } else {
      // Remove password from update if not provided
      delete data.password;
    }

    const user = await User.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).select('-password');

    // Track changes
    const changes = {};
    Object.keys(data).forEach(key => {
      if (key !== 'password' && originalUser[key] !== data[key]) {
        changes[key] = {
          from: originalUser[key],
          to: data[key]
        };
      }
    });

    // Log activity
    await logActivity({
      type: 'user',
      action: 'updated',
      entityType: 'user',
      entityId: user._id,
      entityName: user.name,
      description: createActivityDescription('user', 'updated', user.name, changes),
      user: session.user,
      changes,
      request
    });

    return Response.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return Response.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// PATCH /api/users/[id] - Partial update (for admin status changes)
export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    await connectToDatabase();
    const { id } = await params;

    // Get original user for comparison
    const originalUser = await User.findById(id).select('-password');
    if (!originalUser) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).select('-password');

    // Track changes
    const changes = {};
    Object.keys(data).forEach(key => {
      if (originalUser[key] !== data[key]) {
        changes[key] = {
          from: originalUser[key],
          to: data[key]
        };
      }
    });

    // Determine action type based on changes
    let action = 'updated';
    if (changes.isAdmin !== undefined) {
      action = 'role_changed';
    }

    // Log activity
    await logActivity({
      type: 'user',
      action,
      entityType: 'user',
      entityId: user._id,
      entityName: user.name,
      description: createActivityDescription('user', action, user.name, changes),
      user: session.user,
      changes,
      request
    });

    return Response.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return Response.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = await params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    // Log activity
    await logActivity({
      type: 'user',
      action: 'deleted',
      entityType: 'user',
      entityId: user._id,
      entityName: user.name,
      description: createActivityDescription('user', 'deleted', user.name),
      user: session.user,
      request
    });

    return Response.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return Response.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
