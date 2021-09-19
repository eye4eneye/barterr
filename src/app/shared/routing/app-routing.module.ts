import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TradeLikelihoodCalculatorComponent } from "src/app/components/trade-likelihood-calculator/trade-likelihood-calculator.component";
import { SignupComponent } from "src/app/pages/signup/signup.component";
// Required components for which route services to be activated

// Include route guard in routes array
const routes: Routes = [
  { path: "", pathMatch: "full", component: TradeLikelihoodCalculatorComponent },
  {
    path: 'calculator',
    component: TradeLikelihoodCalculatorComponent,
    data: { navbar: true },
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: "reload"
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
