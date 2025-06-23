// Data Transfer Object for creating a user (e.g., for registration, if implemented)
export class CreateUserDto {
  username!: string;
  password!: string;
  role?: 'admin' | 'staff';
}

// Data Transfer Object for login
export class LoginDto {
  username!: string;
  password!: string;
}

// Data Transfer Object for login response (what frontend gets)
export class LoginResponseDto {
  username!: string;
  role!: 'admin' | 'staff';
  // You might include a simple session token here for MVP,
  // or just rely on status code for initial demo
  accessToken?: string; // e.g., a simple API key
}
