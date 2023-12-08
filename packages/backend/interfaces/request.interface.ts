interface AuthenticatedRequest extends Request {
    userId?: number;
    userEmail?: string;
}

export default AuthenticatedRequest;
