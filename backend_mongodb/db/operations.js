const logger = require("tracer").colorConsole();
const saveDocuments = async (modelObject, data, options) => {
  try {
    let model = new modelObject(data);
    return await model.save(options);
  } catch (error) {
    logger.error("Error while saving data:" + error);
    throw new Error(error);
  }
};

const updateField = async (modelObject, id, update) => {
  try {
    return await modelObject.findOneAndUpdate(id, update, {
      useFindAndModify: false,
    });
  } catch (error) {
    logger.error("Error while updating data:" + error);
    throw new Error(error);
  }
};

module.exports.saveDocuments = saveDocuments;
module.exports.updateField = updateField;
