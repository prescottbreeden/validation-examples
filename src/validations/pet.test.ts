import { renderHook, act } from '@testing-library/react-hooks';
import { emptyPet, Pet } from 'types/Pet.types';
import { PetValidation } from './pet.validation';

describe('pet validations', () => {
  describe('validate All', () => {
    it('validates a valid payload', () => {
      const { result } = renderHook(() => PetValidation());
      const pet: Pet = {
        ...emptyPet(),
        name: 'phil',
        breed: 'chihuahua',
      };
      act(() => {
        result.current.validateAll(pet);
      });
      expect(result.current.validationErrors).toEqual([]);
      expect(result.current.isValid).toBe(true);
    });
  });
});
