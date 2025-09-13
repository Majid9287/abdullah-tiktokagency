import connectToDatabase from '@/lib/mongodb';
import Mentor from '@/models/Mentor';

export async function GET() {
  try {
    await connectToDatabase();
    const count = await Mentor.countDocuments({ isActive: true });
    return Response.json({ count });
  } catch (error) {
    console.error('Error fetching mentor stats:', error);
    return Response.json({ count: 0 }, { status: 500 });
  }
}
