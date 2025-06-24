import { Exercise } from '@/types/dbTypes';
import { smallExList } from './examples/smallExList';

/**
 * Get all exercises from local data
 */
export const getExercises = async (): Promise<Exercise[]> => {
  console.log('Getting exercises from local data');
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return smallExList;
};

/**
 * Get exercises by body part from local data
 */
export const getExercisesByBodyPart = async (bodyPart: string): Promise<Exercise[]> => {
  console.log(`Getting exercises for ${bodyPart} from local data`);
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return smallExList.filter((exercise) => exercise.bodyPart === bodyPart);
};

/**
 * Get exercises by target muscle from local data
 */
export const getExercisesByTarget = async (target: string): Promise<Exercise[]> => {
  console.log(`Getting exercises for target ${target} from local data`);
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return smallExList.filter((exercise) => exercise.target === target);
};

/**
 * Get exercises by equipment from local data
 */
export const getExercisesByEquipment = async (equipment: string): Promise<Exercise[]> => {
  console.log(`Getting exercises for equipment ${equipment} from local data`);
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return smallExList.filter((exercise) => exercise.equipment === equipment);
};

/**
 * Get list of all body parts from local data
 */
export const getBodyPartsList = async (): Promise<string[]> => {
  console.log('Getting body parts list from local data');
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const bodyParts = [...new Set(smallExList.map((exercise) => exercise.bodyPart))];
  return bodyParts;
};

/**
 * Get list of all equipment from local data
 */
export const getEquipmentList = async (): Promise<string[]> => {
  console.log('Getting equipment list from local data');
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const equipment = [...new Set(smallExList.map((exercise) => exercise.equipment))];
  return equipment;
};

/**
 * Get list of all target muscles from local data
 */
export const getTargetList = async (): Promise<string[]> => {
  console.log('Getting target list from local data');
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const targets = [...new Set(smallExList.map((exercise) => exercise.target))];
  return targets;
};
