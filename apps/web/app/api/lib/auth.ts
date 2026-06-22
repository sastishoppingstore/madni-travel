import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '@madni/db';

const JWT_SECRET = process.env.JWT_SECRET || 'madni-travel-secret-key-change-in-production';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  name?: string | null;
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getAuthUser(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.slice(7);
  const payload = verifyToken(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, name: true, role: true, status: true, phone: true, avatar: true },
  });

  if (!user || user.status === 'INACTIVE') return null;
  return user;
}

export function requireAuth(request: Request) {
  return getAuthUser(request);
}

export async function requireAdmin(request: Request) {
  const user = await getAuthUser(request);
  if (!user) return null;
  if (!['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(user.role)) return null;
  return user;
}

export async function requireSuperAdmin(request: Request) {
  const user = await getAuthUser(request);
  if (!user || user.role !== 'SUPER_ADMIN') return null;
  return user;
}

export function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function successResponse(data: unknown, message?: string) {
  return jsonResponse({ success: true, data, message });
}

export function errorResponse(error: string, status = 400) {
  return jsonResponse({ success: false, error }, status);
}

export function unauthorizedResponse() {
  return errorResponse('Unauthorized', 401);
}

export function forbiddenResponse() {
  return errorResponse('Forbidden', 403);
}
