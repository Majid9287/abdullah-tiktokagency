import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['user', 'event', 'mentor', 'country', 'media', 'system']
  },
  action: {
    type: String,
    required: true,
    enum: [
      'created', 'updated', 'deleted', 'reordered', 'activated', 'deactivated',
      'joined', 'left', 'uploaded', 'downloaded', 'viewed', 'searched',
      'login', 'logout', 'password_changed', 'role_changed'
    ]
  },
  entityType: {
    type: String,
    required: true,
    enum: ['user', 'event', 'mentor', 'country', 'media', 'system']
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  entityName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  changes: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient querying
ActivitySchema.index({ createdAt: -1 });
ActivitySchema.index({ userId: 1, createdAt: -1 });
ActivitySchema.index({ entityType: 1, entityId: 1 });
ActivitySchema.index({ type: 1, action: 1 });

export default mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);
