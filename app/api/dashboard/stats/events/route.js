import connectToDatabase from '@/lib/mongodb';
import Event from '@/models/Event';

export async function GET() {
  try {
    await connectToDatabase();
    const count = await Event.countDocuments({ isActive: true });
    return Response.json({ count });
  } catch (error) {
    console.error('Error fetching event stats:', error);
    return Response.json({ count: 0 }, { status: 500 });
  }
}
