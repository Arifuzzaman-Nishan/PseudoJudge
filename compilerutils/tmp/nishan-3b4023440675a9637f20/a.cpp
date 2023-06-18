#include<bits/stdc++.h>
using namespace std;

typedef long long               ll;
typedef vector<int>             vec;

#define pb                      push_back
#define mp                      make_pair
#define lp(a,b)                 for (int i = a; i < b; i++)
#define testcase                ll t;cin>>t;while(t--)
#define pi                      acos(-1)

int N;
int ans[25];
int n_t;
int mini = 1005;
int sum;
int sum1;
int sarr[25];
int v[25];

int solve(int idx , int k)
{
    int l;
    if(idx >= n_t)
    {
        sum = 0;
        for(int i = 0 ; i < k ; i++)
        {
            sum += ans[i];
        }

        if(sum <= N)
        {
            int diff = abs(N-sum);

            if(diff < mini)
            {
                mini = diff;
                sum1 = sum;


            for(int i = 0 ; i < k ; i++)
            {
                sarr[i] = ans[i];
            }
            l = k;

            }
        }
        return l;
    }

    solve(idx+1 , k);
    ans[k] = v[idx];
    solve(idx+1 , k+1);
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);


    while(scanf("%d",&N)!=EOF)
    {
        scanf("%d",&n_t);
        v[n_t+5];

        for(int i = 0 ; i < n_t ; i++)
        {
            scanf("%d",&v[i]);
        }

         int k = solve(0,0);

        for(int i = 0 ; i < k ; i++)
        {
            printf("%d ",sarr[i]);
        }
        printf("sum:%d\n",sum1);
        mini = 1005;


    }

}

