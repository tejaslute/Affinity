import Experience from "../models/Experience.js";

/* READ */
export const getExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await Experience.find({ userId: id });
    res.status(200).json(experience);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createExperience = async (req, res) => {
  try {
    const { title, type, company, location } = req.body;
    const { id } = req.params;
    const newExperience = new Experience({
      user: id,
      title: title,
      type: type,
      company: company,
      location: location,
    });
    await newExperience.save();

    // const experience = await Experience.find();
    res.status(201).json(newExperience);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const { _id, title, type, company, location } = req.body;
    const { id } = req.params;
    const updatedExp = await Experience.findOneAndUpdate({
      _id: _id,
    }, {
      title: title,
      type: type,
      company: company,
      location: location
    }, {
      returnOriginal: false
    });
    

    // const experience = await Experience.find();
    res.status(201).json(updatedExp);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getAllExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await Experience.find({ userId: id });
    res.status(200).json(experience);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findByIdAndDelete(id);
    res.status(200).json(experience);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}