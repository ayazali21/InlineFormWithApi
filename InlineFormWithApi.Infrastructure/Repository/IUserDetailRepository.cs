using InlineFormWithApi.Domain.EntityModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace InlineFormWithApi.Infrastructure.Repository
{
    public interface IUserDetailRepository
    {
        void Add(UserDetails UserDetails);

        //void Update(UserDetails UserDetails);

        //Task<UserDetails> GetAsync(int UserDetailsId);

        Task<List<UserDetails>> GetAllAsync();
    }
}
