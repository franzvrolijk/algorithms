import { showAndWait } from "./App";
import Element from "./Element";

export const someSort = async (array: Element[]) => {
  for (let x = 0; x < array.length / 2; x++) {
    let maxValue = Number.NEGATIVE_INFINITY;
    let maxIndex = -1;
    for (let i = x; i < array.length - x; i++) {
        if (array[i].value > maxValue) {
          if (maxIndex !== -1) {
            array[maxIndex].primary = false;
          }
          maxValue = array[i].value;
          maxIndex = i;
          array[maxIndex].primary = true;
          await showAndWait(array);
        }
    }

    let targetIndex = array.length - 1 - x;
    array[targetIndex].tertiery = true;
    await showAndWait(array);
    [array[targetIndex], array[maxIndex]] = [ array[maxIndex], array[targetIndex]];
    await showAndWait(array);
    array[maxIndex].tertiery = false;
    array[targetIndex].isDone = true;
    await showAndWait(array);

    let minValue = Number.POSITIVE_INFINITY;
    let minIndex = 0;
    for (let i = array.length - 1 - x; i >= x; i--) {
      if (array[i].value < minValue) {
        if (minIndex !== -1) {
          array[minIndex].secondary = false;
        }
        minValue = array[i].value;
        minIndex = i;
        array[minIndex].secondary = true;
        await showAndWait(array);
      }
    }

    array[x].tertiery = true;
    await showAndWait(array);
    [array[x], array[minIndex]] = [array[minIndex], array[x]];
    await showAndWait(array);
    array[minIndex].tertiery = false;
    array[x].isDone = true;
    await showAndWait(array);
  }

  array.filter(r => !r.isDone)[0].isDone = true;
};

const partition = async (array: Element[], left: number, right: number) => {
  const pivotIndex = Math.floor((right + left) / 2);
  const pivot = array[pivotIndex];

  pivot.primary = true;

  let i = left, j = right;

  while (i <= j) {
    while (array[i].value < pivot.value) {
      i++;
    }

    while (array[j].value > pivot.value) {
      j--;
    }

    if (i <= j) {
      array[i].secondary = true;
      array[j].tertiery = true;
      await showAndWait(array);

      [array[i], array[j]] = [array[j], array[i]];

      await showAndWait(array);
      array[j].secondary = false;
      array[i].tertiery = false;
      await showAndWait(array);

      i++;
      j--;
    }
  }

  pivot.primary = false;
  return i;
};

export const quickSort = async (array: Element[], left: number = 0, right: number = array.length - 1) => {
  if (array.length <= 1)
    return array;
  
  let index = await partition(array, left, right);

  if (left < index - 1) {
    await quickSort(array, left, index - 1);
  }
    
  if (index < right) {
    await quickSort(array, index, right);
  }
    
};

export const mergeSort = async (array: Element[], left: number = 0, right: number = array.length - 1) => {
  if (left < right) {
    let mid = left + Math.floor((right - left) / 2);

    await mergeSort(array, left, mid);

    await mergeSort(array, mid + 1, right);

    await merge(array, left, mid, right);
  }

  if (left === 0 && right === array.length - 1) {
    array.forEach(e => e.isDone = true);
  }
  await showAndWait(array);
};

const merge = async (array: Element[], left: number, mid: number, right: number) => {
  let first = [];
  let second = [];

  let i, j;

  first = array.slice(left, mid + 1);
  second = array.slice(mid + 1, right + 1);

  first.forEach((el) => (el.secondary = true));
  second.forEach((el) => (el.tertiery = true));

  i = 0;
  j = 0;
  let k = left;

  while (i < first.length && j < second.length) {
    if (first[i].value < second[j].value) {
      array[k] = first[i];
      i++;
    } else {
      array[k] = second[j];
      j++;
    }

    array[k].primary = true;
    await showAndWait(array);
    array[k].primary = false;

    k++;
  }

  while (i < first.length) {
    array[k] = first[i];
    i++;

    array[k].primary = true;
    await showAndWait(array);
    array[k].primary = false;

    k++;
  }

  while (j < second.length) {
    array[k] = second[j];
    j++;

    array[k].primary = true;
    await showAndWait(array);
    array[k].primary = false;

    k++;
  }

  await showAndWait(array);
  first.forEach((el) => (el.secondary = false));
  second.forEach((el) => (el.tertiery = false));
};
