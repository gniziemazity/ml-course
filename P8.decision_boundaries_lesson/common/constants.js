const constants={};

constants.DATA_DIR="../data";
constants.RAW_DIR=constants.DATA_DIR+"/raw";
constants.DATASET_DIR=constants.DATA_DIR+"/dataset";
constants.JSON_DIR=constants.DATASET_DIR+"/json";
constants.IMG_DIR=constants.DATASET_DIR+"/img";
constants.SAMPLES=constants.DATASET_DIR+"/samples.json";
constants.FEATURES=constants.DATASET_DIR+"/features.json";
constants.TRAINING=constants.DATASET_DIR+"/training.json";
constants.TESTING=constants.DATASET_DIR+"/testing.json";
constants.JS_OBJECTS="../common/js_objects";
constants.SAMPLES_JS=constants.JS_OBJECTS+"/samples.js";
constants.FEATURES_JS=constants.JS_OBJECTS+"/features.js";
constants.TRAINING_JS=constants.JS_OBJECTS+"/training.js";
constants.TESTING_JS=constants.JS_OBJECTS+"/testing.js";
constants.MIN_MAX_JS=constants.JS_OBJECTS+"/minMax.js";
constants.DECISION_BOUNDARY=constants.DATASET_DIR+"/decision_boundary.png";

if(typeof module!=='undefined'){
   module.exports=constants;
}