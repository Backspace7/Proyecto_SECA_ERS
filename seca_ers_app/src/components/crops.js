import React from 'react';
import {List, 
        NumberField,
        DateField,
        Filter, 
        Datagrid, 
        Create, 
        TextField, 
        SimpleForm, 
        Edit, 
        TextInput,
        Show,
        SimpleShowLayout,
        ReferenceField,
        SelectInput,
        ReferenceInput,
        DateInput} from 'react-admin';
const redirect = (basePath, id, data) => '/crops';
const CropsTitle = ({ crop }) => {
    return <span>Crop {crop ? `"${crop.description}"` : ''}</span>;
};

const CropsFilter = (props) => (
    <Filter {...props}>
     
      <TextInput label="location" source="location" defaultValue=" location " />
      <TextInput label="description" source="description" defaultValue=" description " />
      <TextInput label="date" source="date" defaultValue=" date " />
      <ReferenceInput label="phase" source="phaseId" reference="crops-stages" allowEmpty>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="crop" source="cropId" reference="crops-types" allowEmpty>
          <SelectInput optionText="name" />
      </ReferenceInput>
    </Filter>
);

export const CropsCreate = props => (
    <Create {...props}>
        <SimpleForm redirect={redirect}>   
            <ReferenceInput source="cropId" reference="crops-types">
                <SelectInput optionText="name" />
            </ReferenceInput>      
            <ReferenceInput source="phaseId" reference="crops-stages">
                <SelectInput optionText="name" />
            </ReferenceInput>
            
            <TextInput source="location" />
            <TextInput source="description" />
            <DateInput source="date" defaultValue={new Date()} />
        </SimpleForm>
    </Create>
);

export const CropsList = props => (
    <List filters={<CropsFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="location" />
            
            <ReferenceField source="cropId" reference="crops-types">
                <TextField source="name" />
            </ReferenceField>    
            <ReferenceField source="phaseId" reference="crops-stages">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="description" />  
            
            <DateField source="date" />

        </Datagrid>
    </List>
);

export const CropsShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            TextField source="location" />
            <TextField source="description" />
            <ReferenceField source="cropId" reference="crops-types">
                <TextField source="name" />
            </ReferenceField>      
            <ReferenceField source="phaseId" reference="crops-stages">
                <TextField source="name" />
            </ReferenceField>
            <DateField source="date" />
        </SimpleShowLayout>
    </Show>
);

export const CropsEdit = props => (
    <Edit {...props}>
        <SimpleForm redirect={redirect} >
            <ReferenceInput source="cropId" reference="crops-types">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="phaseId" reference="crops-stages">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="location" />
            <TextInput source="description" />
            <DateInput source="date" />
        </SimpleForm>
    </Edit>
);