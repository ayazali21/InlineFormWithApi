using InlineFormWithApi.Domain.EntityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InlineFormWithApi.Infrastructure.Repository.Implementation
{
    public class UserDetailRepository : IUserDetailRepository
    {
        private readonly InlineFormApiContext context;

        public UserDetailRepository(InlineFormApiContext context)
        {
            this.context = context;
        }
        public void Add(UserDetails UserDetails)
        {
            if (UserDetails == null)
                throw new ArgumentNullException();
            context.UserDetails.Add(UserDetails);
            context.SaveChanges();
        }

        public async Task<UserDetails> GetAsync(int UserDetailsId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<UserDetails>> GetAllAsync()
        {
            return context.UserDetails.ToList();
        }

        public void Update(UserDetails UserDetails)
        {
            throw new NotImplementedException();
        }
    }
}
