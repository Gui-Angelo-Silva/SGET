import React from 'react';

const TaskStateLabel = ({ stateNumber }) => {
  const mapStateToText = (stateNumber) => {
    switch (stateNumber) {
      case 1:
        return 'Criada';
      case 2:
        return 'Em Progresso';
      case 3:
        return 'Concluída';
      case 4:
        return 'Cancelada';
      default:
        return 'Desconhecida';
    }
  };

  return (
    <span>{mapStateToText(stateNumber)}</span>
  );
};

export default TaskStateLabel;