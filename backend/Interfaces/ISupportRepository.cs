using techconnect.Models;

namespace techconnect.Interfaces
{
    public interface ISupportRepository
    {
        Task<SupportResult> FindTech(SupportRequest request);
    }
}

