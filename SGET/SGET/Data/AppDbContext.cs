using Microsoft.EntityFrameworkCore;
using SGET.Models;

namespace SGET.Data
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }	

		public DbSet<OTask> OTasks { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder) 
		{
			modelBuilder.Entity<OTask>()
				.Property(t => t.State);

			base.OnModelCreating(modelBuilder);	
		}
	}
}
