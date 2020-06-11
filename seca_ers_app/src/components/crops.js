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
     
      
      <TextInput label="description" source="description" defaultValue=" description " />
      <TextInput label="date" source="date" defaultValue=" date " />
      <ReferenceInput label="phase" source="phaseId" reference="crops-stages" allowEmpty>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="cultivo" source="cropId" reference="crops-types" allowEmpty>
          <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="zona" source="zuid" reference="zones" allowEmpty>
          <SelectInput optionText="zuid" />
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
            <ReferenceInput source="zuid" reference="zones">
                <SelectInput optionText="zuid" />
            </ReferenceInput>
            
            <TextInput source="description" />
            <DateInput source="date" defaultValue={new Date()} />
        </SimpleForm>
    </Create>
);

export const CropsList = props => (
    <List filters={<CropsFilter />} {...props}>
        <Datagrid rowClick="edit">
            
            
            <ReferenceField label="Cultivo" source="cropId" reference="crops-types">
                <TextField source="name" />
            </ReferenceField>    
            <ReferenceField label="Fase Fenologica" source="phaseId" reference="crops-stages">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Zona" source="zuid" reference="zones">
                <TextField source="zuid" />
            </ReferenceField>
            <TextField label="Descripcion" source="description" />  
            
            <DateField source="date" />

        </Datagrid>
    </List>
);

export const CropsShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            
            <TextField source="description" />
            <ReferenceField source="cropId" reference="crops-types">
                <TextField source="name" />
            </ReferenceField>      
            <ReferenceField source="phaseId" reference="crops-stages">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="zuid" reference="zones">
                <TextField source="zuid" />
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
            <ReferenceInput source="zuid" reference="zones">
                <SelectInput optionText="zuid" />
            </ReferenceInput>
            
            <TextInput source="description" />
            <DateInput source="date" />
        </SimpleForm>
    </Edit>
);