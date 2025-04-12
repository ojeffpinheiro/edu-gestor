import { ConversionRelation, UnitType } from "../utils/types/Question";

export const sampleConversions: ConversionRelation[] = [
    { fromUnit: '1', toUnit: '2', factor: 100, formula: 'value * 100' },
    { fromUnit: '1', toUnit: '3', factor: 0.001, formula: 'value * 0.001' },
    { fromUnit: '2', toUnit: '1', factor: 0.01, formula: 'value * 0.01' },
    { fromUnit: '3', toUnit: '1', factor: 1000, formula: 'value * 1000' },
    { fromUnit: '4', toUnit: '5', factor: 1000, formula: 'value * 1000' },
    { fromUnit: '5', toUnit: '4', factor: 0.001, formula: 'value * 0.001' },
    { fromUnit: '6', toUnit: '7', factor: 1 / 60, formula: 'value / 60' },
    { fromUnit: '6', toUnit: '8', factor: 1 / 3600, formula: 'value / 3600' },
    { fromUnit: '7', toUnit: '6', factor: 60, formula: 'value * 60' },
    { fromUnit: '7', toUnit: '8', factor: 1 / 60, formula: 'value / 60' },
    { fromUnit: '8', toUnit: '6', factor: 3600, formula: 'value * 3600' },
    { fromUnit: '8', toUnit: '7', factor: 60, formula: 'value * 60' }
];

export const sampleUnits: UnitType[] = [
    { id: '1', name: 'Metro', symbol: 'm', type: 'Comprimento', baseUnit: true, description: 'Unidade básica de comprimento no SI' },
    { id: '2', name: 'Centímetro', symbol: 'cm', type: 'Comprimento', baseUnit: false, conversionFactor: 0.01, baseUnitId: '1', description: '1/100 de um metro' },
    { id: '3', name: 'Quilômetro', symbol: 'km', type: 'Comprimento', baseUnit: false, conversionFactor: 1000, baseUnitId: '1', description: '1000 metros' },
    { id: '4', name: 'Quilograma', symbol: 'kg', type: 'Massa', baseUnit: true, description: 'Unidade básica de massa no SI' },
    { id: '5', name: 'Grama', symbol: 'g', type: 'Massa', baseUnit: false, conversionFactor: 0.001, baseUnitId: '4', description: '1/1000 de um quilograma' },
    { id: '6', name: 'Segundo', symbol: 's', type: 'Tempo', baseUnit: true, description: 'Unidade básica de tempo no SI' },
    { id: '7', name: 'Minuto', symbol: 'min', type: 'Tempo', baseUnit: false, conversionFactor: 60, baseUnitId: '6', description: '60 segundos' },
    { id: '8', name: 'Hora', symbol: 'h', type: 'Tempo', baseUnit: false, conversionFactor: 3600, baseUnitId: '6', description: '3600 segundos ou 60 minutos' },
    { id: '9', name: 'Newton', symbol: 'N', type: 'Força', baseUnit: true, description: 'kg·m/s²' },
    { id: '10', name: 'Joule', symbol: 'J', type: 'Energia', baseUnit: true, description: 'N·m' }
  ];