import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['video', 'image'],
    default: 'video',
  },
  // Video fields
  videoUrl: {
    type: String,
  },
  platform: {
    type: String,
    enum: ['youtube', 'tiktok', 'other'],
  },
  thumbnail: {
    type: String,
  },
  // Image fields
  imageUrl: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to auto-increment order
EventSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      // Find the highest order value
      const highestOrderEvent = await mongoose.models.Event.findOne({}, {}, { sort: { 'order': -1 } });
      this.order = highestOrderEvent ? highestOrderEvent.order + 1 : 1;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
