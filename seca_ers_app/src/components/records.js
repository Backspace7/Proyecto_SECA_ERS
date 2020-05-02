import React from 'react';
import {List, 
        Filter, 
        Datagrid, 
        Create, 
        TextField, 
        SimpleForm, 
        Edit, 
        Show,
        SimpleShowLayout,
        ReferenceField,
        NumberField,
        SelectInput,
        ReferenceInput,
        DateField,
        NumberInput,
        DateTimeInput,
        DateInput
        } from 'react-admin';

	const redirect = (basePath, id, data) => '/records';

	var date_now = new Date(1568200000000);
	date_now.setDate(date_now.getDate() +1);
	



const RecordFilter = (props) => (
    <Filter {...props}>

    	<ReferenceInput label="sensors" source="suid" reference="sensors" allowEmpty>
		    <SelectInput optionText="suid" />
		</ReferenceInput>
		<ReferenceInput label="types" source="tuid" reference="sen-types" allowEmpty>
		    <SelectInput optionText="type" />
		</ReferenceInput>
		<DateInput  label="Date Time" source="createdAt"  /> 
    	
    </Filter>
);

export const RecordList = props => (
    <List filters={<RecordFilter />} {...props}>
        <Datagrid rowClick="edit">
            <NumberField source="dat" />
            <DateField source="createdAt" showTime/>
            <ReferenceField source="suid" reference="sensors">
                <TextField source="suid" />
            </ReferenceField>
            <ReferenceField source="tuid" reference="sen-types">
                <TextField source="type" />
            </ReferenceField>
        </Datagrid>
    </List>
);

export const RecordEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <NumberInput source="dat" />
            <ReferenceInput source="suid" reference="sensors">
                <SelectInput optionText="suid" />
            </ReferenceInput>
            <ReferenceInput source="tuid" reference="sen-types">
                <SelectInput optionText="type" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const RecordCreate = props => (
	
    <Create {...props}>
        <SimpleForm redirect={redirect}>
            <NumberInput source="dat" />
            <ReferenceInput source="suid" reference="sensors">
                <SelectInput optionText="suid" />
            </ReferenceInput>
            <ReferenceInput source="tuid" reference="sen-types">
                <SelectInput optionText="type" />
            </ReferenceInput>
            <ReferenceField source="createdAt" defaultValue={date_now} />
        </SimpleForm>
    </Create>
);

export const RecordShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <NumberField source="dat" />
            <NumberField source="suid" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
        </SimpleShowLayout>
    </Show>
);