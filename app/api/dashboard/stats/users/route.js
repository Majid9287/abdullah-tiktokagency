import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectToDatabase();
    const total = await User.countDocuments();
    const admins = await User.countDocuments({ isAdmin: true });
    return Response.json({ total, admins });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return Response.json({ total: 0, admins: 0 }, { status: 500 });
  }
}
