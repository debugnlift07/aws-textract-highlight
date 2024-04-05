// File: aws-global-fix.ts
// This file creates a custom 'global' object for the AWS SDK in the browser environment.

// @ts-ignore
import * as AWS from 'aws-sdk'; // Import the AWS SDK

// Create a custom 'global' object
const customGlobal: any = typeof window !== 'undefined' ? window : {};

// Assign the AWS SDK to the custom 'global' object
customGlobal.AWS = AWS;

// Export the custom 'global' object
export default customGlobal;
