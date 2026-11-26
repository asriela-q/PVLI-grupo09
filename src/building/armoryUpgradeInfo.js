export const ARMORY_MAX_LEVEL = 3;

const ARMORY_COLUMNS = [
    {
        title: 'Attack:',
        upgrades: [
            { id: 'attack', label: '+ATK', statName: 'Base dmg', suffix: '', values: [5, 20, 35], costs: [50, 120, 250] },
            { id: 'attackSpeed', label: '+ATK SPEED', statName: 'Atk speed', suffix: '%', values: [5, 10, 15], costs: [80, 200, 400] }
        ]
    },
    {
        title: 'Vitality:',
        upgrades: [
            { id: 'defense', label: '+DEF', statName: 'Base defense', suffix: '', values: [2, 8, 15], costs: [40, 100, 220] },
            { id: 'hp', label: '+HP',  statName: 'Max HP',  suffix: '', values: [20, 45, 65], costs: [60, 150, 300] }
        ]
    },
    {
        title: 'Stamina:',
        upgrades: [
            { id: 'stamina', label: '+STAMINA', statName: 'Max stamina', suffix: '',  values: [3, 8, 15], costs: [40, 100, 220] },
            { id: 'staminaRecovery', label: '+REC',  statName: 'Recovery rate', suffix: '%', values: [15, 30, 50], costs: [85, 230, 550] }
        ]
    }
];

export default ARMORY_COLUMNS;
