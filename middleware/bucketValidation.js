import { check } from "express-validator";

// Create Bucket Validation
export const bucketValidation = [
  // bucket_name validation
  check("bucket_name")
    .notEmpty().withMessage("Enter bucket name")
    .isLength({ min: 5 }).withMessage("Bucket Name must have at least 5 characters"),

    // bucket_access validation
  check("bucket_access")
    .notEmpty().withMessage("Enter emails this field must be value")
    
];

// Allow roles Validation
export const alloRolesValidation = [
  // bucketId validation
  check("bucketId")
    .notEmpty().withMessage("Enter bucketId"),

  // accessUserId validation
  check("accessUserId")
    .notEmpty().withMessage("Enter accessUserId"),

    // newOperationAccess validation
  check("newOperationAccess")
  .notEmpty().withMessage("Enter newOperationAccess, these 3 value ( read, write, read_write )"),

];

// Object Upload Validation
export const objectValidation = [
    // // object validation
    // check("object")
    //     .notEmpty().withMessage("Object field is empty please upload a object"),

    // object name validation
  check("object_name")
  .notEmpty().withMessage("Enter object_name")
  .isLength({ min: 5 }).withMessage("object_name must be at least 5 characters"),
];
