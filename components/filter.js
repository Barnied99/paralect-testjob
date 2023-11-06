import { Text, Button, Flex, MultiSelect, NumberInput } from "@mantine/core";
import { IconChevronDown } from '@tabler/icons-react';


const Filter = ({ resetButton, submitFilter, dataSelect,
    selectData, handlesetSelect, numberdatafrom,
    setNumberDataFrom, numberdatabefore, setNumberDataBefore }) => {

    return (
        <>
            <div className="filter">
                <div className="fil">
                    <Text fw={600} size={20} style={{ minWidth: '93px' }}>Фильтр</Text>
                    <Button
                        onClick={resetButton}
                        size={'sm'}
                        variant="subtle"
                        c="#ACADB9"
                        compact><Text fw={450}>Сбросить все x</Text>
                    </Button>
                </div>
                <form onSubmit={submitFilter}>
                    <div className="otrasl">
                        <Text fw={600} size={16} style={{ maxWidth: '70px' }}>Отрасль</Text>
                        <MultiSelect
                            data-elem='industry-select'
                            placeholder="введите отрасль"
                            styles={{ rightSection: { pointerEvents: 'none' } }}
                            rightSection={<IconChevronDown
                                size="1rem" />}
                            rightSectionWidth={40}
                            data={Object.values(dataSelect)}
                            value={selectData}
                            onChange={(value) => handlesetSelect(value)}
                            maxDropdownHeight={150}
                        />
                    </div>

                    <div className="oklad">

                        <Flex
                            gap="sm"
                            direction="column"
                        ><Text fw={600} size={16} style={{ maxWidth: '52px' }}>Оклад</Text>
                            <NumberInput
                                data-elem='salary-from-input'
                                precision={0}
                                min={0}
                                step={1000}
                                max={100000000}
                                placeholder="От"
                                value={numberdatafrom}
                                onChange={setNumberDataFrom}
                            />
                            <NumberInput
                                precision={0}
                                data-elem='salary-to-input'
                                min={0}

                                step={1000}
                                max={100000000}
                                placeholder="До"
                                value={numberdatabefore}
                                onChange={setNumberDataBefore}
                            />
                        </Flex>

                    </div>

                    <div className="button">
                        <Button data-elem='search-button' fullWidth variant="filled"
                            type="submit"
                        >Применить</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Filter


