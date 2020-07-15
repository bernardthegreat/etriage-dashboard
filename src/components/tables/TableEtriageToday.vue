<template>
	<div class="container">
			<div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
					<h1 class="display-4">ETriage Employees Today</h1>
			</div>
			<div class="card-deck mb-12 text-center">
					<div class="card mb-4 shadow-sm">
							<div class="card-body">
									<div style="height: 400px; overflow-y: auto;">
											<table id="" class="table table-striped table-hover text-center">
													<thead>
															<tr>
																	<th scope="col" width="20%">Name</th>
																	<th scope="col">Age</th>
																	<th scope="col">Gender</th>
																	<th scope="col">Position</th>
																	<th scope="col">Department</th>
																	<th scope="col">Class</th>
																	<th scope="col">Temperature</th>
															</tr>
													</thead>
													<tbody>
															<tr v-bind:key="key" v-for="(eTriageDetailedTodayResult, key) in eTriageDetailedToday">
																	<td>{{eTriageDetailedTodayResult.name}}</td>
																	<td>{{eTriageDetailedTodayResult.age}}</td>
																	<td>{{eTriageDetailedTodayResult.gender}}</td>
																	<td>{{eTriageDetailedTodayResult.position}}</td>
																	<td>{{eTriageDetailedTodayResult.department}}</td>
																	<td>{{eTriageDetailedTodayResult.class}}</td>
																	<td>{{eTriageDetailedTodayResult.temperature}}</td>
															</tr>
													</tbody>
											</table>
									</div>
							</div>
					</div>
			</div>
	</div>
</template>

<script>
export default {
	props: ["apiKey", "apiUrl"],
	data() {
		return {
			eTriageDetailedToday: '',
		}
	},
	created() {
		this.eTriageDetailedCountToday();
	},
	methods: {
		async eTriageDetailedCountToday() {
				const response = await fetch(
						`${this.apiUrl}etriage/dashboard-etriage-today?auth=${this.apiKey}`,
						{
								method: "GET",
								headers: { "Content-Type": "application/json" },
						}
				);
				const responseJson = await response.json();

				if (responseJson.length > 0) {
						this.showStatus = true;
				}

				this.eTriageDetailedToday = responseJson;
		},
	}
}
</script>

<style scoped>

</style>