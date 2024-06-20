using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using SGET.Data;

namespace SGET
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		public void ConfigureServices(IServiceCollection services)
		{
			var connectionString = Configuration.GetConnectionString("DefaultConnection");
			if (string.IsNullOrEmpty(connectionString))
			{
				throw new InvalidOperationException("A cadeia de conexão 'DefaultConnection' é nula ou vazia.");
			}

			services.AddDbContext<AppDbContext>(options =>
				options.UseNpgsql(connectionString));

			services.AddControllers();

			// Configurar o Swagger
			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "Task Management API", Version = "v1" });
			});

			services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
			{
				builder.WithOrigins("http://localhost:3000", "http://localhost:5173")
					.AllowAnyMethod()
					.AllowAnyHeader()
					.AllowCredentials();
			}));
		}

		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseRouting();

			// Habilitar middleware do Swagger
			app.UseSwagger();
			app.UseSwaggerUI(c =>
			{
				c.SwaggerEndpoint("/swagger/v1/swagger.json", "Task Management API V1");
			});

			app.UseCors("MyPolicy");

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}
