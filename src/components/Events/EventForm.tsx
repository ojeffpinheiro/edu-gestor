import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';
import { CalendarEvent, EventType } from '../../utils/types/CalendarEvent';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #40a9ff;
  }
`;

interface EventFormProps {
  event?: CalendarEvent;
  onSave: (event: CalendarEvent) => void;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    title: '',
    type: 'class',
    start: new Date(),
    end: new Date(),
    isAllDay: false
  });

  useEffect(() => {
    if (event) {
      setFormData({
        ...event,
        start: event.start instanceof Date ? event.start : parseISO(event.start as unknown as string),
        end: event.end instanceof Date ? event.end : parseISO(event.end as unknown as string),
      });
    }
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDateChange = (name: 'start' | 'end', value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: new Date(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.start || !formData.end) return;
    
    const newEvent: CalendarEvent = {
      id: event?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      type: formData.type as EventType,
      start: formData.start,
      end: formData.end,
      isAllDay: formData.isAllDay,
      recurrence: formData.recurrence
    };
    
    onSave(newEvent);
  };

  return (
    <FormContainer>
      <FormGroup>
        <Label>Título</Label>
        <Input 
          type="text" 
          name="title" 
          value={formData.title || ''} 
          onChange={handleChange} 
          required 
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Tipo de Evento</Label>
        <Select name="type" value={formData.type} onChange={handleChange}>
          <option value="aula">Aula</option>
          <option value="avaliacao">Avaliação</option>
          <option value="feriado">Feriado</option>
          <option value="recesso">Recesso</option>
          <option value="reuniao">Reunião</option>
          <option value="entrega_resultados">Entrega de Resultados</option>
          <option value="formacao">Formação</option>
          <option value="data_importante">Data Importante</option>
          <option value="avaliacao_externa">Avaliação Externa</option>
          <option value="semana_tematica">Semana Temática</option>
          <option value="aula_assincrona">Aula Assíncrona</option>
          <option value="conselho_participativo">Conselho Participativo</option>
          <option value="sabado_letivo">Sábado Letivo</option>
        </Select>
      </FormGroup>
      
      <FormGroup>
        <Label>Dia Inteiro</Label>
        <Input 
          type="checkbox" 
          name="allDay" 
          checked={formData.isAllDay || false} 
          onChange={handleChange} 
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Início</Label>
        <Input 
          type={formData.isAllDay ? 'date' : 'datetime-local'} 
          name="start" 
          value={format(formData.start || new Date(), formData.isAllDay ? 'yyyy-MM-dd' : "yyyy-MM-dd'T'HH:mm")} 
          onChange={(e) => handleDateChange('start', e.target.value)} 
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Fim</Label>
        <Input 
          type={formData.isAllDay ? 'date' : 'datetime-local'} 
          name="end" 
          value={format(formData.end || new Date(), formData.isAllDay ? 'yyyy-MM-dd' : "yyyy-MM-dd'T'HH:mm")} 
          onChange={(e) => handleDateChange('end', e.target.value)} 
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Descrição</Label>
        <Input 
          type="text" 
          name="description" 
          value={formData.description || ''} 
          onChange={handleChange} 
        />
      </FormGroup>
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button type="button" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" onClick={handleSubmit}>Salvar</Button>
      </div>
    </FormContainer>
  );
};

export default EventForm;