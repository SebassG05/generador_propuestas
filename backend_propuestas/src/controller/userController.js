import jwt from 'jsonwebtoken';
export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({ message: 'Email/nombre y contraseña son obligatorios' });
    }
    // Buscar por email o nombre de usuario
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { nombre: identifier }
      ]
    });
    if (!user) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }
    // Generar token JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );
    res.status(200).json({
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};
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

// Logout: simplemente indica al cliente que borre el token
export const logout = (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    // Aquí podrías guardar un log, invalidar el token, etc.
    res.status(200).json({ message: `Logout exitoso para usuario ${decoded.id}. El token debe ser eliminado del cliente.` });
  } catch (err) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
