// src/pages/UnitsManagement/index.tsx
import React, { useState } from 'react';
import { FaPlus, FaExchangeAlt } from 'react-icons/fa';

import { ConversionRelation, UnitType } from '../../utils/types/Question';
import { sampleConversions, sampleUnits } from '../../mocks/conversionRelation';
import ConversionRelationModal from '../../components/modals/Unit/ConversionRelationModal';

import UnitForm from '../../components/Units/UnitForm';
import UnitListItem from '../../components/Units/UnitListItem';
import UnitCategoryTable from '../../components/Units/UnitCategoryTable';
import ConversionCalculator from '../../components/Units/ConversionCalculator';
import EmptyState from '../../components/Units/EmptyState';

import { UNIT_CATEGORIES } from '../../utils/unitConstants';

import {
    Section,
    Container,
    Flex,
} from '../../styles/layoutUtils';
import {
    Input,
    Select,
} from '../../styles/inputs';

import {
    Button
} from '../../styles/buttons';

import {
    SearchBar,
    UnitsList,
    UnitCategoriesSection,
} from './styles';


const UnitsManagement: React.FC = () => {
    const [units, setUnits] = useState<UnitType[]>(sampleUnits);
    const [conversions, setConversions] = useState<ConversionRelation[]>(sampleConversions);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [showUnitForm, setShowUnitForm] = useState(false);
    const [showConversionForm, setShowConversionForm] = useState(false);
    const [editingConversion, setEditingConversion] = useState<ConversionRelation | null>(null);

    // Estados para o formulário de unidade
    const [newUnit, setNewUnit] = useState<Partial<UnitType>>({
        name: '',
        symbol: '',
        type: UNIT_CATEGORIES[0],
        description: '',
        baseUnit: false
    });

    // Estados para edição
    const [editingUnitId, setEditingUnitId] = useState<string | null>(null);

    // Filtragem de unidades
    const filteredUnits = units.filter(unit => {
        const matchesSearch = unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            unit.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            unit.description?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory === 'all' || unit.type === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // Funções de gerenciamento
    const handleAddUnit = () => {
        const unitId = Date.now().toString();
        const unitToAdd: UnitType = {
            id: unitId,
            name: newUnit.name || '',
            symbol: newUnit.symbol || '',
            type: newUnit.type || UNIT_CATEGORIES[0],
            description: newUnit.description,
            baseUnit: newUnit.baseUnit || false,
        };

        if (!newUnit.baseUnit && newUnit.baseUnitId) {
            unitToAdd.baseUnitId = newUnit.baseUnitId;
            unitToAdd.conversionFactor = newUnit.conversionFactor;
        }

        if (editingUnitId) {
            setUnits(units.map(u => u.id === editingUnitId ? { ...unitToAdd, id: editingUnitId } : u));
            setEditingUnitId(null);
        } else {
            setUnits([...units, unitToAdd]);
        }

        resetUnitForm();
        setShowUnitForm(false);
    };

    const handleDeleteUnit = (id: string) => {
        // Verificar se existem conversões relacionadas
        const hasRelatedConversions = conversions.some(
            conv => conv.fromUnit === id || conv.toUnit === id
        );

        if (hasRelatedConversions) {
            alert('Esta unidade possui conversões relacionadas. Remova-as primeiro.');
            return;
        }

        setUnits(units.filter(unit => unit.id !== id));
    };

    const handleEditUnit = (unit: UnitType) => {
        setNewUnit({
            name: unit.name,
            symbol: unit.symbol,
            type: unit.type,
            description: unit.description,
            baseUnit: unit.baseUnit,
            baseUnitId: unit.baseUnitId,
            conversionFactor: unit.conversionFactor
        });
        setEditingUnitId(unit.id);
        setShowUnitForm(true);
    };

    const resetUnitForm = () => {
        setNewUnit({
            name: '',
            symbol: '',
            type: UNIT_CATEGORIES[0],
            description: '',
            baseUnit: false
        });
        setEditingUnitId(null);
    };

    const handleSaveConversion = (conversion: ConversionRelation) => {
        if (editingConversion) {
            // Atualizar conversão existente
            setConversions(conversions.map(conv =>
                conv.fromUnit === editingConversion.fromUnit && conv.toUnit === editingConversion.toUnit
                    ? conversion
                    : conv
            ));
        } else {
            // Adicionar nova conversão
            setConversions([...conversions, conversion]);
        }
        setEditingConversion(null);
        setShowConversionForm(false);
    };

    // Agrupar unidades por categoria
    const unitsByCategory = UNIT_CATEGORIES.reduce((acc, category) => {
        const categoryUnits = units.filter(unit => unit.type === category);
        if (categoryUnits.length > 0) {
            acc[category] = categoryUnits;
        }
        return acc;
    }, {} as Record<string, UnitType[]>);

    return (
        <Container>
            <Section>
                <h1>Gerenciamento de Unidades de Medida</h1>
                <p>
                    Gerencie as unidades de medida utilizadas em suas equações e problemas.
                    Defina unidades básicas e suas relações para facilitar conversões automáticas.
                </p>

                <SearchBar justify="between" align="center">
                    <Flex align="center" gap="md">
                        <div>
                            <Input
                                type="text"
                                placeholder="Buscar unidades..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div>
                            <Select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="all">Todas as categorias</option>
                                {UNIT_CATEGORIES.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </Select>
                        </div>
                    </Flex>

                    <Flex gap="md">
                        <Button
                            variant="primary"
                            onClick={() => {
                                resetUnitForm();
                                setShowUnitForm(true);
                            }}
                        >
                            <FaPlus /> Adicionar Unidade
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setEditingConversion(null);
                                setShowConversionForm(true);
                            }}
                        >
                            <FaExchangeAlt /> Nova Conversão
                        </Button>
                    </Flex>
                </SearchBar>

                {/* Lista de Unidades */}
                {filteredUnits.length > 0 ? (
                    <UnitsList>
                        {filteredUnits.map(unit => (
                            <UnitListItem
                                key={unit.id}
                                unit={unit}
                                units={units}
                                onEdit={handleEditUnit}
                                onDelete={handleDeleteUnit}
                            />
                        ))}
                    </UnitsList>
                ) : (
                    <EmptyState message="Nenhuma unidade encontrada. Crie uma nova unidade ou ajuste seus filtros." />
                )}

                {/* Visualização por Categorias */}
                <UnitCategoriesSection>
                    <h2>Unidades por Categoria</h2>

                    {Object.keys(unitsByCategory).length > 0 ? (
                        Object.entries(unitsByCategory).map(([category, categoryUnits]) => (
                            <UnitCategoryTable
                                key={category}
                                category={category}
                                units={categoryUnits}
                                allUnits={units}
                                onEdit={handleEditUnit}
                                onDelete={handleDeleteUnit}
                            />
                        ))
                    ) : (
                        <EmptyState message="Nenhuma categoria com unidades encontrada." />
                    )}
                </UnitCategoriesSection>

                {/* Conversor de Unidades */}
                <ConversionCalculator
                    units={units}
                    conversions={conversions}
                    unitCategories={UNIT_CATEGORIES}
                />
            </Section>

            {/* Modal de Relação de Conversão */}
            {showConversionForm && (
                <ConversionRelationModal
                    isOpen={showConversionForm}
                    onClose={() => {
                        setShowConversionForm(false);
                        setEditingConversion(null);
                    }}
                    onSave={handleSaveConversion}
                    units={units}
                    editingConversion={editingConversion}
                    title={editingConversion ? 'Editar Relação de Conversão' : 'Nova Relação de Conversão'}
                />
            )}

            {/* Formulário para adicionar/editar unidade */}
            {showUnitForm && (
                    <UnitForm
                        isOpen={showUnitForm}
                        unit={newUnit}
                        setUnit={setNewUnit}
                        onSubmit={handleAddUnit}
                        onCancel={() => {
                            resetUnitForm();
                            setShowUnitForm(false);
                        }}
                        isEditing={!!editingUnitId}
                        unitCategories={UNIT_CATEGORIES}
                        units={units}
                    />
                )}
        </Container>
    );
};

export default UnitsManagement;