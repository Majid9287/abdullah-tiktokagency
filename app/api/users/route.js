import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { logActivity, createActivityDescription } from '@/lib/activityLogger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET /api/users - Get all users with search
export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';

    // Build search query
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (role && role !== 'all') {
      if (role === 'admin') {
        query.isAdmin = true;
      } else if (role === 'system-admin') {
        query.isSystemAdmin = true;
      } else if (role === 'user') {
        query.isAdmin = false;
        query.isSystemAdmin = false;
      }
    }

    // Get all results
    const users = await User.find(query)
      .select('-password') // Exclude password from response
      .sort({ createdAt: -1 });

    return Response.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return Response.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST /api/users - Create new user
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return Response.json({ message: 'User with this email already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Create user
    const user = await User.create({
      ...data,
      password: hashedPassword,
    });

    // Log activity
    await logActivity({
      type: 'user',
      action: 'created',
      entityType: 'user',
      entityId: user._id,
      entityName: user.name,
      description: createActivityDescription('user', 'created', user.name),
      user: session.user,
      request
    });

    // Return user without password
    const { password, ...userWithoutPassword } = user.toObject();

    return Response.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return Response.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
