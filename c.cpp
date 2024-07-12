#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> dp;

int maxPages(int i, int j, const vector<int>& cost, const vector<int>& pages) {
    if (i == 0 || j == 0) {
        return 0;
    }
    if (dp[i][j] != -1) {
        return dp[i][j];
    }
    if (j < cost[i - 1]) {
        dp[i][j] = maxPages(i - 1, j, cost, pages); 
    } else {
        dp[i][j] = max(maxPages(i - 1, j, cost, pages), pages[i - 1] + maxPages(i - 1, j - cost[i - 1], cost, pages)); 
    }
    return dp[i][j];
}

int main() {
    int n, x;
    cin >> n >> x;

    vector<int> cost(n);
    vector<int> pages(n);

    for (int i = 0; i < n; ++i) {
        cin >> cost[i];
    }

    for (int i = 0; i < n; ++i) {
        cin >> pages[i];
    }

    dp.assign(n + 1, vector<int>(x + 1, -1));
    int result = maxPages(n, x, cost, pages);
    cout << result << endl;

    return 0;
}
