import mongoose from 'mongoose';
import Cause from '../models/cause';

//Create a new cause
export function createCause(req, res) {
  const cause = new Cause({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
  });
  return cause
    .save()
    .then((newCause) => {
      return res.status(201).json({
        success: true,
        message: 'New Cause Created Successfully',
        cause: newCause,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });
}
// Get all causes
export function getAllCause(req, res) {
  Cause.find()
    .select('_id title description')
    .then((allCause) => {
      return res.status(200).json({
        success: true,
        message: 'A list of all causes',
        Cause: allCause,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
}

// get single Cause
export function getSingleCause(req, res) {
  const id = req.params.causeId;
  Cause.findById(id)
    .then((singleClause) => {
      res.status(200).json({
        success: true,
        message: `More on ${singleClause.title}`,
        Cause: singleClause,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
}

export function updateCause(req, res) {
  const id = req.params.causeId;
  const updateObject = req.body;
  Cause.update({ _id: id }, { $set: updateObject })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Cause id updated',
        updateCause: updateObject
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: fallse,
        message: 'Server error, Please try Again',
        error: err.message
      });
    });
}

export function deleteCause(req, res) {
  const id = req.params.causeId;
  Cause.findByIdAndRemove(id)
    .exec()
    .then(() => res.status(200).json({
      success: true,
      message: 'Deleted'
    }))
    .catch(() => res.status(500).json({
      success: false,
      message: 'This Id doesnot exist'
    }))
}