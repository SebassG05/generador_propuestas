import User from '../../models/User.js';
import bcrypt from 'bcryptjs';

// Requisitos mínimos de contraseña: 8 caracteres, una mayúscula, una minúscula, un número
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const register = async (req, res) => {
  try {
    const { nombre, email, password, password2 } = req.body;
    if (!nombre || !email || !password || !password2) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    if (password !== password2) {
      return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número' });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ nombre, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};
