using InlineFormWithApi.Domain.EntityModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace InlineFormWithApi.Infrastructure.EntityConfiguration
{
    public class UserDetailEntityConfiguration : IEntityTypeConfiguration<UserDetails>
    {
        public void Configure(EntityTypeBuilder<UserDetails> builder)
        {

            builder.HasKey(o => o.Id);
        }
    }
}
