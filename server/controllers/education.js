import Education from "../models/Education.js";

/* READ */
export const getEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const education = await Education.find({ userId: id });
    res.status(200).json(education);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createEducation = async (req, res) => {
  try {
    const { institute, startDate, endDate, location } = req.body;
    const { id } = req.params;
    const newEducation = new Education({
      user: id,
      institute:institute,
      startDate:startDate,
      endDate: endDate, 
      location: location,
    });
    await newEducation.save();

    // const education = await Education.find();
    res.status(201).json(newEducation);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const { _id, title, type, company, location } = req.body;
    const { id } = req.params;
    const updatedExp = await Education.findOneAndUpdate({
      _id: _id,
    }, {
      title: title,
      type: type,
      company: company,
      location: location
    }, {
      returnOriginal: false
    });
    

    // const education = await Education.find();
    res.status(201).json(updatedExp);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getAllEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const education = await Education.find({ userId: id });
    res.status(200).json(education);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const education = await Education.findByIdAndDelete(id);
    res.status(200).json(education);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}