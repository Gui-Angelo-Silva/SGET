using SGET.Models.Enum;
using System.Threading.Tasks;

namespace SGET.Models
{
	public class OTask
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public TaskState State { get; set; }
	}
}
