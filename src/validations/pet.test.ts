import { renderHook, act } from '@testing-library/react-hooks';
import { emptyPet, Pet, PET_TYPE_ENUM } from 'types/pet.types';
import { PetValidation } from './pet.validation';

describe('pet validations', () => {
  describe('name', () => {
    it('fails if no name is provided', () => {
      const { result } = renderHook(() => PetValidation());
      act(() => {
        const output = result.current.validate('name', '');
        expect(output).toBe(false);
      });
    });
    it('passes if name is provided', () => {
      const { result } = renderHook(() => PetValidation());
      act(() => {
        const output = result.current.validate('name', 'Nick Furry');
        expect(output).toBe(true);
      });
    });
  });

  describe('breed', () => {
    it('fails if no breed is provided', () => {
      const { result } = renderHook(() => PetValidation());
      const pet: Pet = {
        ...emptyPet(),
        name: 'Nick Furry',
        breed: '',
      };
      act(() => {
        const output = result.current.validate('breed', pet.breed, pet);
        expect(output).toBe(false);
      });
    });
    it('passes if breed is provided', () => {
      const { result } = renderHook(() => PetValidation());
      const pet: Pet = {
        ...emptyPet(),
        name: 'Nick Furry',
        breed: 'kitteh',
      };
      act(() => {
        const output = result.current.validate('breed', pet.breed, pet);
        expect(output).toBe(true);
      });
    });
    it('fails if name is Garfield and breed is not Persian/Tabby', () => {
      const { result } = renderHook(() => PetValidation());
      const pet: Pet = {
        ...emptyPet(),
        name: 'Garfield',
        breed: 'tabby',
        petTypeId: PET_TYPE_ENUM.CAT,
      };
      act(() => {
        const output = result.current.validate('breed', pet.breed, pet);
        expect(output).toBe(false);
      });
    });
    it('passes if name is Garfield and breed is Persian/Tabby', () => {
      const { result } = renderHook(() => PetValidation());
      const pet: Pet = {
        ...emptyPet(),
        name: 'garfield',
        breed: 'persian/tabby',
        petTypeId: PET_TYPE_ENUM.CAT,
      };
      act(() => {
        const output = result.current.validate('breed', pet.breed, pet);
        expect(output).toBe(true);
      });
    });
  });

  describe('favoriteChewToy', () => {
    it('passes if petTypeId is cat', () => {
      const { result } = renderHook(() => PetValidation());
      const pet: Pet = {
        ...emptyPet(),
        petTypeId: PET_TYPE_ENUM.CAT,
        favoriteChewToy: '',
      };
      act(() => {
        const output = result.current.validate(
          'favoriteChewToy',
          pet.favoriteChewToy,
          pet
        );
        expect(output).toBe(true);
      });
    });
    it('fails if a dog has no favoriteChewToy', () => {
      const { result } = renderHook(() => PetValidation());
      const pet: Pet = {
        ...emptyPet(),
        petTypeId: PET_TYPE_ENUM.DOG,
        favoriteChewToy: '',
      };
      act(() => {
        const output = result.current.validate(
          'favoriteChewToy',
          pet.favoriteChewToy,
          pet
        );
        expect(output).toBe(false);
      });
    });
    it('passes if a dog has a favoriteChewToy', () => {
      const { result } = renderHook(() => PetValidation());
      const pet: Pet = {
        ...emptyPet(),
        petTypeId: PET_TYPE_ENUM.DOG,
        favoriteChewToy: 'the cat',
      };
      act(() => {
        const output = result.current.validate(
          'favoriteChewToy',
          pet.favoriteChewToy,
          pet
        );
        expect(output).toBe(true);
      });
    });
  });

  describe('sleepingHabits', () => {
    it('passes if a petTypeId is dog', () => {
      const { result } = renderHook(() => PetValidation());
      const pet: Pet = {
        ...emptyPet(),
        petTypeId: PET_TYPE_ENUM.DOG,
        sleepingHabits: 'frequent napping',
      };
      act(() => {
        const output = result.current.validate(
          'sleepingHabits',
          pet.sleepingHabits,
          pet
        );
        expect(output).toBe(true);
      });
    });
    it('fails if a cat has no sleepingHabits', () => {
      const { result } = renderHook(() => PetValidation());
      const pet: Pet = {
        ...emptyPet(),
        petTypeId: PET_TYPE_ENUM.CAT,
        sleepingHabits: '',
      };
      act(() => {
        const output = result.current.validate(
          'sleepingHabits',
          pet.sleepingHabits,
          pet
        );
        expect(output).toBe(false);
      });
    });
    it('passes if a cat has a sleepingHabits', () => {
      const { result } = renderHook(() => PetValidation());
      const pet: Pet = {
        ...emptyPet(),
        petTypeId: PET_TYPE_ENUM.CAT,
        sleepingHabits: 'frequent napping',
      };
      act(() => {
        const output = result.current.validate(
          'sleepingHabits',
          pet.sleepingHabits,
          pet
        );
        expect(output).toBe(true);
      });
    });
  });
});
