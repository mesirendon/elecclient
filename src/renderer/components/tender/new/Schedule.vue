<template>
  <div>
    <h3>Cronograma</h3>
    <div class="descriptor">
      <div class="form-group row">
        <label class="col-form-label col-6" for="date1">Publicación del aviso, convocatoria y estudios previos</label>
        <div class="md-form col-3">
          <input type="date" id="date1" class="form-control">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-form-label col-6" for="date2">Presentar observaciones al pliego de condiciones</label>
        <div class="md-form col-3">
          <input type="date" id="date2" class="form-control">
        </div>
        <p class="col-3">mínimo 10 días hábiles</p>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date3">Respuesta a las observaciones al pliego de condiciones y publicación</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date3" class="form-control">
          </div>
        </div>
        <div class="col-3">
          <p>3 a 5 días hábiles</p>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date4">Fecha de presentación del pliego definitivo. Expedición y publicación de acto administrativo de apertira del proceso de selección</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date4" class="form-control">
          </div>
        </div>
        <div class="col-3"></div>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date5">Audiencia de asignación de riesgos</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date5" class="form-control">
          </div>
        </div>
        <div class="col-3"></div>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date6">Presentar observaciones al pliego de condiciones definitivo</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date6" class="form-control">
          </div>
        </div>
        <div class="col-3">
          <p>1 día hábil</p>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date7">Respuesta observaciones al pliego de condiciones definitivo</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date7" class="form-control">
          </div>
        </div>
        <div class="col-3">
          <p>3 a 5 días hábiles</p>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date8">Plazo máximo para expedir adendas</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date8" class="form-control">
          </div>
        </div>
        <div class="col-3">
          <p>3 días hábiles antes de las 7 p.m.</p>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date9">Cierre de presentación de ofertas</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date9" class="form-control">
          </div>
        </div>
        <div class="col-3">
          <p>definir fecha y hora</p>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date10">Apertura de ofertas</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date10" class="form-control">
          </div>
        </div>
        <div class="col-3">
          <p>misma fecha y hora</p>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date11">Informe de presentación de ofertas</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date11" class="form-control">
          </div>
        </div>
        <div class="col-3">
          <p>30 min más porque tarda en desencriptar</p>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date12">Publicación del informe de evaluación de ofertas</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date12" class="form-control">
          </div>
        </div>
        <div class="col-3">
          <p>5 días después</p>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date13">Observaciones del informe de evaluación de ofertas</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date13" class="form-control">
          </div>
        </div>
        <div class="col-3">
          <p>5 días hábiles</p>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date14">Audiencia de adjudicación y publicación de acto administrativo de adjudicación</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date14" class="form-control">
          </div>
        </div>
        <div class="col-3"></div>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date15">Firma del contrato</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date15" class="form-control">
          </div>
        </div>
        <div class="col-3"></div>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date16">Entrega de garantías de ejecución de contrato</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date16" class="form-control">
          </div>
        </div>
        <div class="col-3"></div>
      </div>
      <div class="form-group row">
        <div class="col-6">
          <label for="date17">Plazo de validez de las ofertas</label>
        </div>
        <div class="col-3">
          <div class="md-form">
            <input type="date" id="date17" class="form-control">
          </div>
        </div>
        <div class="col-3"></div>
      </div>

    </div>
    <h3>Configuración financiera</h3>
    <div class="descriptor">
      <question text="Definir Plan de Pagos?" type="logical"/>
      <question text="¿Pago de anticipos?" type="logical"/>
      <question text="¿Solicitud de garantías?" type="logical"/>
    </div>

    <h3>Mipymes</h3>
    <question class="descriptor" text="Licitar este proceso a Mipymes" type="logical"/>

    <h3>Visita al lugar de ejecución</h3>
    <question class="descriptor" text="¿Permitir visitas al lugar de ejecución?" type="logical"/>

    <h3>Lotes</h3>
    <div class="descriptor">
      <question text="Definir lotes" type="logical"/>
      <question text="Definir valor estimado por lote" type="logical"/>
      <label for="loteInput">Lotes</label>
      <input type="text" id="loteInput" class="form-control" placeholder="Lote 1">
    </div>

    <h3>Precios</h3>
    <question class="descriptor" text="Valor estimado" type="text"/>

    <h3>Información presupuestal</h3>
    <div class="descriptor">
      <question text="Plan del Plan Marco para la Implementación del Acuerdo de Paz o asociado al Acuerdo de Paz" type="logical"/>
      <question text="Destinación de gasto" :dropdownOptions="{0: 'Seleccione', 1: 'Funcionamiento', 2: 'Inversión', 3: 'No aplica'}" type="dropdown"/>
      <question text="Origen de los recursos" :dropdownOptions="{0: 'Seleccione', 1: 'Recursos propios', 2: 'Presupuestonacional/territorial', 3: 'Regalías', 4: 'Recursos de crédito', 5: 'SGP', 6: 'No aplica'}" type="dropdown"/>
      <question text="Entidad Estatal registrada en el SIIF" type="logical"/>
    </div>

    <h3>Configuraciones avanzadas</h3>
    <question class="descriptor" text="¿Visualizar y editar configuraciones avanzadas?" type="logical"/>

  </div>
</template>

<script>
  import Question from '@/components/tender/new/Question';

  export default {
    name: 'Schedule',
    components: {
      Question,
    },
  };
</script>
