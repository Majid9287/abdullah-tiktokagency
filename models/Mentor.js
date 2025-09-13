import mongoose from 'mongoose';

const MentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  socialLinks: {
    instagram: String,
    tiktok: String,
    youtube: String,
    twitter: String,
  },
  availability: [{
    day: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      required: true
    },
    timeRange: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
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
MentorSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      // Find the highest order value
      const highestOrderMentor = await mongoose.models.Mentor.findOne({}, {}, { sort: { 'order': -1 } });
      this.order = highestOrderMentor ? highestOrderMentor.order + 1 : 1;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

export default mongoose.models.Mentor || mongoose.model('Mentor', MentorSchema);
