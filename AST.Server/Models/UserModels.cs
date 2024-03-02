public class RegisterModel
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public bool RememberMe { get; set; }
}

public class LoginModel
{
    public string Username { get; set; }
    public string Password { get; set; }
    public bool RememberMe { get; set; }
}

public class ResetPasswordModel
{
    public string Email { get; set; }
    public string Code { get; set; }
    public string Password { get; set; }
}
