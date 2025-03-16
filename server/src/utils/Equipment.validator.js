class EquipmentValidator {
  /**
   * Метод для валидации данных оборудования.
   * @param {object} data - Объект данных оборудования, который необходимо проверить.
   * @param {string} data.name - Название оборудования (обязательное поле).
   * @param {number} data.price - Цена оборудования (обязательное поле, тип FLOAT).
   * @param {string} data.description - Описание оборудования (обязательное поле).
   * @param {string} data.image - Ссылка на изображение оборудования (обязательное поле).
   * @param {boolean} data.isRented - Статус аренды оборудования (обязательное поле).
   * @param {number} data.user_id - ID пользователя (обязательное поле).
   * @returns {object} - Объект, содержащий результат валидации.
   * @returns {boolean} isValid - Флаг, указывающий на валидность данных.
   * @returns {string|null} error - Сообщение об ошибке валидации, если имеется, иначе null.
   */
  static validate(data) {
    const {
      name,
      price,
      description,
      image,
      isRented,
      address,
      coordinates,
      // user_id,
    } = data;

    //! Проверка валидности поля name
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return {
        isValid: false,
        error: 'Name is required and must be a non-empty string.',
      };
    }

    //! Проверка валидности поля price (FLOAT)
    if (
      !price ||
      typeof price !== 'number' ||
      isNaN(price) || // Проверка, что это число
      price <= 0 // Проверка, что цена положительная
    ) {
      return {
        isValid: false,
        error: 'Price is required and must be a positive number (FLOAT).',
      };
    }

    //! Проверка валидности поля description
    if (!description || typeof description !== 'string') {
      return {
        isValid: false,
        error: 'Description is required and must be a string.',
      };
    }

    //! Проверка валидности поля image
    if (!image || typeof image !== 'string' || image.trim() === '') {
      return {
        isValid: false,
        error: 'Image URL is required and must be a non-empty string.',
      };
    }

    //! Проверка валидности поля isRented
    if (isRented === undefined || typeof isRented !== 'boolean') {
      return {
        isValid: false,
        error: 'isRented is required and must be a boolean.',
      };
    }
    if (!address || typeof address !== 'string' || address.trim() === '') {
      return {
        isValid: false,
        error: 'Address is required and must be a non-empty string.',
      };
    }

    if (
      !coordinates ||
      !Array.isArray(coordinates) ||
      coordinates.length !== 2
    ) {
      return {
        isValid: false,
        error:
          'Coordinates are required and must be an array of two numbers (latitude and longitude).',
      };
    }
    if (
      typeof coordinates[0] !== 'number' ||
      typeof coordinates[1] !== 'number' ||
      isNaN(coordinates[0]) ||
      isNaN(coordinates[1])
    ) {
      return {
        isValid: false,
        error:
          'Coordinates must contain two valid numbers (latitude and longitude).',
      };
    }

    // //! Проверка валидности поля user_id
    // if (!user_id || typeof user_id !== "number" || user_id <= 0) {
    //   return {
    //     isValid: false,
    //     error: "User ID is required and must be a positive number.",
    //   };
    // }

    return {
      isValid: true,
      error: null,
    };
  }
}

module.exports = EquipmentValidator;
