import { DetalhesProfessorComponent } from './lista-professores/detalhes-professor/detalhes-professor.component';
import { ListaProfessoresComponent } from './lista-professores/lista-professores.component';
import { ListaDepartamentosComponent } from './lista-departamentos/lista-departamentos.component';
import { DetalhesCursoComponent } from './lista-cursos/detalhes-curso/detalhes-curso.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsuarioService } from './services/usuario.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';

import { EsqueciMinhaSenhaComponent } from './esqueci-minha-senha/esqueci-minha-senha.component';
import { LobbyComponent } from './lobby/lobby.component';
import { ListaAlunosComponent } from './lista-alunos/lista-alunos.component';
import { CpfPipe } from './pipes/cpf.pipe';
import { HomeComponent } from './home/home.component';
import { DetalhesAlunoComponent } from './lista-alunos/detalhes-aluno/detalhes-aluno.component';
import { ListaCursosComponent } from './lista-cursos/lista-cursos.component';
import { DetalhesDepartamentoComponent } from './lista-departamentos/detalhes-departamento/detalhes-departamento.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EsqueciMinhaSenhaComponent,
    LobbyComponent,
    ListaAlunosComponent,
    CpfPipe,
    HomeComponent,
    DetalhesAlunoComponent,
    ListaCursosComponent,
    DetalhesCursoComponent,
    ListaDepartamentosComponent,
    DetalhesDepartamentoComponent,
    ListaProfessoresComponent,
    DetalhesProfessorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatSnackBarModule,
    MatButtonModule,
    MatSelectModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,
    MatTableModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
