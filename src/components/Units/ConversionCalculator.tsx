// src/components/Units/ConversionCalculator.tsx
import React, { useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import { UnitType, ConversionRelation } from '../../types/evaluation/Question';
import { Grid, Flex } from '../../styles/layoutUtils';
import { Input, Label, InputGroup, Select } from '../../styles/inputs';
import { Button } from '../../styles/buttons';

import { 
    ConversionCalculator as StyledCalculator, 
    ConversionResult 
} from '../../pages/UnitsManagement/styles';

interface ConversionCalculatorProps {
    units: UnitType[];
    conversions: ConversionRelation[];
    unitCategories: string[];
}

const ConversionCalculator: React.FC<ConversionCalculatorProps> = ({
    units,
    conversions,
    unitCategories
}) => {
    const [conversionFrom, setConversionFrom] = useState<string>('');
    const [conversionTo, setConversionTo] = useState<string>('');
    const [conversionValue, setConversionValue] = useState<number>(1);
    const [conversionResult, setConversionResult] = useState<number | null>(null);

    const handleConvert = () => {
        if (!conversionFrom || !conversionTo || conversionValue === null) {
            return;
        }
      
        // Encontrar conversão direta
        const directConversion = conversions.find(
            c => c.fromUnit === conversionFrom && c.toUnit === conversionTo
        );
      
        if (directConversion) {
            // Usar a fórmula de conversão definida
            try {
                if (directConversion.formula) {
                    // eslint-disable-next-line no-eval
                    const result = eval(directConversion.formula.replace('value', conversionValue.toString()));
                    setConversionResult(result);
                    return;
                }
                // Fallback para o fator simples se não houver fórmula
                setConversionResult(conversionValue * directConversion.factor);
                return;
            } catch (error) {
                console.error('Erro ao aplicar fórmula:', error);
                // Fallback para o fator simples
                setConversionResult(conversionValue * directConversion.factor);
                return;
            }
        }

        // Lógica para conversão indireta (via unidade base)
        const fromUnit = units.find(u => u.id === conversionFrom);
        const toUnit = units.find(u => u.id === conversionTo);

        if (fromUnit && toUnit && fromUnit.type === toUnit.type) {
            if (fromUnit.baseUnit && toUnit.conversionFactor) {
                // De unidade base para derivada
                setConversionResult(conversionValue / toUnit.conversionFactor);
            } else if (toUnit.baseUnit && fromUnit.conversionFactor) {
                // De derivada para unidade base
                setConversionResult(conversionValue * fromUnit.conversionFactor);
            } else if (fromUnit.baseUnitId === toUnit.baseUnitId &&
                fromUnit.conversionFactor && toUnit.conversionFactor) {
                // Ambas derivadas da mesma base
                const valueInBase = conversionValue * fromUnit.conversionFactor;
                setConversionResult(valueInBase / toUnit.conversionFactor);
            } else {
                alert('Não foi possível encontrar uma conversão entre essas unidades.');
            }
        } else {
            alert('Não é possível converter entre diferentes tipos de unidades.');
        }
    };

    return (
        <StyledCalculator>
            <h2>Conversor de Unidades</h2>
            <p>
                Teste as conversões entre unidades de mesma categoria.
            </p>

            <Grid columns={3} gap="md">
                <InputGroup>
                    <Label>Valor</Label>
                    <Input
                        type="number"
                        value={conversionValue}
                        onChange={(e) => setConversionValue(parseFloat(e.target.value))}
                    />
                </InputGroup>

                <InputGroup>
                    <Label>De</Label>
                    <Select
                        value={conversionFrom}
                        onChange={(e) => {
                            setConversionFrom(e.target.value);
                            // Resetar o campo "Para" se a categoria mudar
                            const selectedUnit = units.find(u => u.id === e.target.value);
                            const currentToUnit = units.find(u => u.id === conversionTo);
                            if (selectedUnit && currentToUnit && selectedUnit.type !== currentToUnit.type) {
                                setConversionTo('');
                            }
                        }}
                    >
                        <option value="">Selecione uma unidade</option>
                        {unitCategories.map(category => (
                            <optgroup key={category} label={category}>
                                {units
                                    .filter(unit => unit.type === category)
                                    .map(unit => (
                                        <option key={unit.id} value={unit.id}>
                                            {unit.name} ({unit.symbol})
                                        </option>
                                    ))}
                            </optgroup>
                        ))}
                    </Select>
                </InputGroup>

                <InputGroup>
                    <Label>Para</Label>
                    <Select
                        value={conversionTo}
                        onChange={(e) => setConversionTo(e.target.value)}
                        disabled={!conversionFrom}
                    >
                        <option value="">Selecione uma unidade</option>
                        {conversionFrom && (
                            units
                                .filter(unit => {
                                    const fromUnitType = units.find(u => u.id === conversionFrom)?.type;
                                    return unit.type === fromUnitType && unit.id !== conversionFrom;
                                })
                                .map(unit => (
                                    <option key={unit.id} value={unit.id}>
                                        {unit.name} ({unit.symbol})
                                    </option>
                                )))}
                    </Select>
                </InputGroup>
            </Grid>

            <Flex justify="center" style={{ marginTop: 'var(--space-md)' }}>
                <Button
                    variant="primary"
                    onClick={handleConvert}
                    disabled={!conversionFrom || !conversionTo}>
                    <FaExchangeAlt /> Converter
                </Button>
            </Flex>

            {conversionResult !== null && (
                <ConversionResult>
                    {conversionValue} {units.find(u => u.id === conversionFrom)?.symbol} = {' '}
                    <strong>{conversionResult}</strong> {units.find(u => u.id === conversionTo)?.symbol}
                </ConversionResult>
            )}
        </StyledCalculator>
    );
};

export default ConversionCalculator;