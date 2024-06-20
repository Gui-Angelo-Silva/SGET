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
			var task = await _context.OTasks.FindAsync(id);
			return task == null ? NotFound() : Ok(task);
		}

		[HttpPost]
		public async Task<ActionResult<OTask>> PostTask(OTask task)
		{
			if (task == null)
			{
				return BadRequest("Tarefa não pode ser nula!");
			}

			task.State = TaskState.Created;
			_context.OTasks.Add(task);
			await _context.SaveChangesAsync();

			return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
		}

		[HttpPut("{id}/start")]
		public async Task<IActionResult> StartTask(int id)
		{
			var task = await _context.OTasks.FindAsync(id);

			if (task == null)
			{
				return NotFound($"A Tarefa com o id: {id} não existe!");
			}

			if (task.State != TaskState.Created)
			{
				return BadRequest($"A tarefa não pode ser iniciada a partir do seu estado atual: {task.State}.");
			}

			task.State = TaskState.InProgress;
			_context.Entry(task).State = EntityState.Modified;
			await _context.SaveChangesAsync();

			return NoContent();
		}

		[HttpPut("{id}/complete")]
		public async Task<IActionResult> CompleteTask(int id)
		{
			var task = await _context.OTasks.FindAsync(id);

			if (task == null)
			{
				return NotFound($"A Tarefa com o id: {id} não existe!");
			}

			if (task.State != TaskState.InProgress)
			{
				return BadRequest($"A tarefa não pode ser concluída a partir do seu estado atual: {task.State}");
			}

			task.State = TaskState.Completed;
			_context.Entry(task).State = EntityState.Modified;
			await _context.SaveChangesAsync();

			return NoContent();
		}

		[HttpPut("{id}/cancel")]
		public async Task<IActionResult> CancelTask(int id)
		{
			var task = await _context.OTasks.FindAsync(id);

			if (task == null)
			{
				return NotFound($"A Tarefa com o id: {id} não existe!");
			}

			if (task.State != TaskState.Created && task.State != TaskState.InProgress)
			{
				return BadRequest($"A tarefa não pode ser cancelada a partir do seu estado atual: {task.State}");
			}

			task.State = TaskState.Canceled;
			_context.Entry(task).State = EntityState.Modified;
			await _context.SaveChangesAsync();

			return NoContent();
		}
	}
}
