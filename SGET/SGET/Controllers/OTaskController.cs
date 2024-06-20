using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SGET.Data;
using SGET.Models;
using SGET.Models.Enum;

namespace SGET.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class OTaskController : ControllerBase
	{
		private readonly AppDbContext _context;

		public OTaskController(AppDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<OTask>>> GetAllTasks()
		{
			var tasks = await _context.OTasks.ToListAsync();
			return Ok(tasks);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<OTask>> GetTask(int id)
		{
			var tasks = await _context.OTasks.FindAsync(id);

			if (tasks == null)
			{
				return NotFound();
			}

			return tasks;
		}

		[HttpPost]
		public async Task<ActionResult<OTask>> PostTask(OTask tasks)
		{
			tasks.State = TaskState.Created;
			_context.OTasks.Add(tasks);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetTask", new { id = tasks.Id }, tasks);
		}

		[HttpPut("{id}/start")]
		public async Task<IActionResult> StartTask(int id)
		{
			var tasks = await _context.OTasks.FindAsync(id);

			if (tasks == null)
			{
				return NotFound();
			}

			if (tasks.State == TaskState.Created) 
			{
				tasks.State = TaskState.InProgress;
				_context.Entry(tasks).State = EntityState.Modified;
				await _context.SaveChangesAsync();
			}
			else
			{
				return BadRequest("A tarefa não pode ser iniciada a partir do seu estado atual.");
			}

			return NoContent();
		}

		[HttpPut("{id}/complete")]
		public async Task<IActionResult> CompleteTask(int id)
		{
			var tasks = await _context.OTasks.FindAsync(id);

			if (tasks == null)
			{
				return NotFound();
			}

			if (tasks.State == TaskState.InProgress)
			{
				tasks.State = TaskState.Completed;
				_context.Entry(tasks).State = EntityState.Modified;
				await _context.SaveChangesAsync();
			}
			else
			{
				return BadRequest("A tarefa não pode ser concluída a partir do seu estado atual.");
			}

			return NoContent();
		}

		[HttpPut("{id}/cancel")]
		public async Task<IActionResult> CancelTask(int id)
		{
			var tasks = await _context.OTasks.FindAsync(id);

			if (tasks == null)
			{
				return NotFound();
			}

			if (tasks.State == TaskState.Created || tasks.State == TaskState.InProgress) 
			{
				tasks.State = TaskState.Canceled;
				_context.Entry(tasks).State = EntityState.Modified;
				await _context.SaveChangesAsync();
			}
			else
			{
				return BadRequest("Task cannot be canceled from its current state.");
			}

			return NoContent();
		}
	}
}
