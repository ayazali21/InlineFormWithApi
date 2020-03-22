using InlineFormWithApi.Domain.EntityModel;
using InlineFormWithApi.Infrastructure.EntityConfiguration;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace InlineFormWithApi.Infrastructure
{
    public class InlineFormApiContext : DbContext
    {
        public DbSet<UserDetails> UserDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserDetailEntityConfiguration());

            base.OnModelCreating(modelBuilder);
        }

        public InlineFormApiContext(DbContextOptions<InlineFormApiContext> options) :base(options)
        {

        }
    }
}
