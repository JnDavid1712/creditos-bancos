import { useEffect, useState } from 'react'
import { FormData, ModalData, SimulationData, SimulationSummary } from './Interface/Data'
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import arrowUp from './assets/arrowUp.svg';
import arrowDown from './assets/arrowDown.svg';

function ModalTable(
    { dataToSimulate, formData, setSimulationSummary }: { dataToSimulate: ModalData | object, formData: FormData, setSimulationSummary: React.Dispatch<React.SetStateAction<SimulationSummary | null>> }
) {

    const [simulationData, setSimulationData] = useState<SimulationData[]>([]);
    const [loading, setLoading] = useState(true);


    const columns: ColumnDef<SimulationData>[] = [
        {
            accessorKey: 'month',
            header: 'Mes',
        },
        {
            accessorKey: 'date',
            header: 'Fecha',
        },
        {
            accessorKey: 'remainingAmount',
            header: 'Saldo restante',
        },
        {
            accessorKey: 'payment',
            header: 'Pago',
        },
        {
            accessorKey: 'capital',
            header: 'Capital',
        },
        {
            accessorKey: 'interest',
            header: 'Intereses',
        },
        {
            accessorKey: 'finalAmount',
            header: 'Saldo final',
        },
    ];



    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data: simulationData || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
        },
    });

    const calculatePMT = (rate: number, n: number, principal: number) => {
        if (rate === 0) return principal / n;

        const monthlyPayment = (rate * principal) / (1 - Math.pow(1 + rate, -n));
        return monthlyPayment;
    };



    useEffect(() => {
        if (typeof dataToSimulate === 'object' && 'data' in dataToSimulate) {
            let remainingAmount = formData.amount;
            const fees = formData.term;
            const currentDate = new Date();
            const interestRate = parseFloat(dataToSimulate.data.tasa_efectiva_promedio) / 100 / 12;
            const payment = calculatePMT(interestRate, fees, remainingAmount);
            const arraySimulation: SimulationData[] = [];
            let totalInterest = 0;
            let totalValue = 0;

            for (let i = 1; i <= fees; i++) {
                const interest = remainingAmount * interestRate;
                const capital = payment - interest;
                let finalAmount = remainingAmount - capital;

                const date = currentDate.toLocaleDateString('es-CO');

                if(finalAmount < 0){
                    finalAmount = 0;
                }

                const valuesFormattedToCurrency = {
                    month: i,
                    date: date,
                    remainingAmount: remainingAmount.toLocaleString('es-CO', {
                        style: 'currency',
                        currency: 'COP',
                        minimumFractionDigits: 0,
                    }),
                    payment: payment.toLocaleString('es-CO', {
                        style: 'currency',
                        currency: 'COP',
                        minimumFractionDigits: 0,
                    }),
                    capital: capital.toLocaleString('es-CO', {
                        style: 'currency',
                        currency: 'COP',
                        minimumFractionDigits: 0,
                    }),
                    interest: interest.toLocaleString('es-CO', {
                        style: 'currency',
                        currency: 'COP',
                        minimumFractionDigits: 0,
                    }),
                    finalAmount: finalAmount.toLocaleString('es-CO', {
                        style: 'currency',
                        currency: 'COP',
                        minimumFractionDigits: 0,
                    }),
                };

                arraySimulation.push(valuesFormattedToCurrency);

                remainingAmount = finalAmount;
                currentDate.setMonth(currentDate.getMonth() + 1);
                totalInterest += interest;
                totalValue += payment;
                if (i === fees) {
                    setLoading(false);
                    break;
                };
            }
            setSimulationData(arraySimulation);
            setSimulationSummary({
                mensualInterest: parseFloat(interestRate).toFixed(3)+ '%',
                paymentPerMonth: payment.toLocaleString('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0,
                }),
                totalInterest: totalInterest.toLocaleString('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0,
                }),
                totalValue: totalValue.toLocaleString('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0,
                }),
            });
        }

    }, [dataToSimulate, formData, setSimulationSummary]);

    if (loading) return <div>Loading...</div>;


    return (
        <table>
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            const sortingState = sorting.find((sort) => sort.id === header.id);
                            return (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {sortingState && (
                                        sortingState.desc ? <img src={arrowDown} alt="Descendente" /> : <img src={arrowUp} alt="Ascendente" />
                                    )}
                                </th>
                            );
                        })}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (

                            <td
                                key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}

            </tbody>
        </table>
    )
}

export default ModalTable