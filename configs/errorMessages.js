const error400Message = {
  email: 'Пользователь с таким email уже существует',
  password: 'Необходимо ввести пароль (от восьми символов и выше)',
};

const error401Message = {
  wrong: 'Неправильные почта или пароль',
};

const errorValidityMessage = {
  link: 'Поле "Ссылка" должно содержать ссылку.',
  image: 'Поле "Изображение" должно содержать ссылку на изображение.',
};

module.exports = { error400Message, error401Message, errorValidityMessage };
